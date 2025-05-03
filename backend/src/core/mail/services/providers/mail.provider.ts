import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { HttpException, Logger } from '@nestjs/common';

export abstract class EmailProvider<T> {
  private readonly logger: Logger;

  private readonly originalSubject: string;

  private readonly originalTemplate: string;

  public constructor(
    private readonly mailName: string,
    private templateName: string,
    private subject: string,
    private readonly mailerService: MailerService,
  ) {
    this.logger = new Logger(this.mailName);
    this.templateName = `${templateName}.hbs`;
    this.originalSubject = subject;
    this.originalTemplate = `${templateName}.hbs`;
  }

  protected abstract configMail(data: T): Promise<object>;

  protected changeSubject(newSubject: string) {
    this.subject = newSubject;
  }

  protected changeTemplate(newTemplate: string) {
    this.templateName = `${newTemplate}.hbs`;
  }

  protected async apply({ data, to }: { data: T; to: string }): Promise<void> {
    try {
      const context = await this.configMail(data);

      const mailConfigSend: ISendMailOptions = {
        to,
        template: this.templateName,
        subject: this.subject,
        context,
      };

      await this.mailerService.sendMail(mailConfigSend);

      this.subject = this.originalSubject;
      this.templateName = this.originalTemplate;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('An error occurred while sending the email', 503);
    }
  }
}
