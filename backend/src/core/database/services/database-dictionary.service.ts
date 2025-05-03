import { writeFileSync, appendFileSync, existsSync, unlinkSync } from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { join } from 'path';

import { EnvironmentVariablesProvider } from '@core/enviroment-variables/providers/enviroment-variables.provider';
import { DatabaseConnection } from '../domain/connection/database.connection';

interface IDictionary {
  table: string;
  description: string;
  columns: Array<{
    name: string;
    description: string;
    type: string;
    optional: boolean;
  }>;
  indexes?: Array<{ name: string; column: string }>;
  fks?: Array<{ column: string; table: string }>;
}

@Injectable()
export class DatabaseDictionaryService implements OnModuleInit {
  private directoryBase = join(process.cwd(), 'docs');

  public constructor(private readonly env: EnvironmentVariablesProvider) {}

  public async onModuleInit() {
    const data = await this.findDatabaseDictionary();

    await Promise.all(
      data.map((value) => {
        const directory = `${this.directoryBase}/docs/${value.file}.md`;

        try {
          existsSync(directory);
          unlinkSync(directory);
        } catch {}

        appendFileSync(
          `${this.directoryBase}/docs/${value.file}.md`,
          value.content,
        );
      }),
    );

    await this.ymlFile(data);
  }

  private async findDatabaseDictionary(): Promise<
    Array<{ file: string; content: string }>
  > {
    const source = new DataSource(
      new DatabaseConnection(this.env).getConnection() as DataSourceOptions,
    );

    await source.initialize();

    const tables = (await source.query(`   select
        st.relname as tabela,
        pgd.description as descricao
    from
        pg_catalog.pg_statio_all_tables as st
    inner join pg_catalog.pg_description pgd on
        pgd.objoid = st.relid
    where
        pgd.objsubid = 0
    ORDER BY st.relname ASC `)) as Array<{ tabela: string; descricao: string }>;

    const dictionary: Array<IDictionary> = [];

    for (let index = 0; index < tables.length; index++) {
      const table = tables[index];

      const columns = (await source.query(`
          select 
    c.column_name as name,
    c.is_nullable as optional,
    c.data_type as type,
    pgd.description as description
    from information_schema.columns c 
    inner join pg_catalog.pg_statio_all_tables st on st.relname = c.table_name
    inner join pg_catalog.pg_description pgd on pgd.objoid  = st.relid and pgd.objsubid = c.ordinal_position
    where c.table_name = '${table.tabela}' and pgd.objsubid <> 0
          `)) as Array<{
        name: string;
        optional: boolean;
        type: string;
        description: string;
      }>;

      const fks = (await source.query(`
        SELECT
    kcu.column_name as column, 
    ccu.table_name AS table
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_name='${table.tabela}'
        `)) as Array<{ column: string; table: string }>;

      const indexes =
        (await source.query(`select i.relname as name, a.attname as column
    from pg_class t, pg_class i, pg_index ix, pg_attribute a, pg_namespace n
    where t.oid = ix.indrelid and i.oid = ix.indexrelid and a.attrelid = t.oid
    and a.attnum = ANY(ix.indkey) and n.oid=t.relnamespace and t.relkind = 'r'
    and t.relname='${table.tabela}'`)) as Array<{
          name: string;
          column: string;
        }>;

      dictionary.push({
        table: table.tabela,
        description: table.descricao,
        columns,
        fks,
        indexes,
      });
    }

    return await Promise.all(
      dictionary.map((value) => {
        const content = this.baseFile(value);

        return { file: value.table, content };
      }),
    );
  }

  private baseFile({ description, columns, indexes, fks }: IDictionary) {
    const columnsFormatted = columns.reduce((columns, column) => {
      columns += `| ${column.name} | ${column.description} | ${column.type} | ${`${column.optional}` == 'YES' ? ':white_check_mark:' : 'X'}\n`;

      return columns;
    }, '' as string);

    const indexesFormatted = indexes
      ? indexes.reduce((indexes, index) => {
          indexes += `| ${index.name} | ${index.column}\n`;
          return indexes;
        }, '')
      : 'No indexes for this table';

    const fksFormatted = fks
      ? fks.reduce((indexes, index) => {
          indexes += `| ${index.column} | [${index.table}](../${index.table})\n`;
          return indexes;
        }, '')
      : 'No indexes for this table';

    return `## Descrição
${description}

| Column Name        | Description                          | Type         | Option   |
| :----------        | :----------------------------------- | :----------- | :------- |
${columnsFormatted}
## Foreign Keys
| Coluna             | Table                                      |
| :----------        | :----------------------------------------- |
${fksFormatted}

## Indexes
| Index Name         | Column Index                               |
| :----------        | :----------------------------------------- |
${indexesFormatted}
    `;
  }

  private async ymlFile(dataValue: Array<{ file: string; content: string }>) {
    const siteName = 'Transfer Bank Data Dictionary - API';

    let nav = '- Home: index.md';

    await Promise.all(
      dataValue.map((value) => {
        nav = `${nav}
        - ${value.file}: ${value.file}.md`;
      }),
    );

    const data = `
    site_name: ${siteName}
    nav:
        ${nav}
    theme:
        name: 'material'
    markdown_extensions:
      - tables
      - attr_list
      - pymdownx.emoji:
          emoji_index: !!python/name:material.extensions.emoji.twemoji
          emoji_generator: !!python/name:material.extensions.emoji.to_svg
    `;

    writeFileSync(`${this.directoryBase}/mkdocs.yml`, data);
  }
}
