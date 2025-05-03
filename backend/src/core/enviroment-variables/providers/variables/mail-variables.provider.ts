export class MailVariablesProvider {
  public constructor(
    /**
     * Variable to define the SMTP server host for sending emails
     */
    public host: string,

    /**
     * Variable to define the SMTP server connection port for sending emails
     */
    public port: number,

    /**
     * Variable for defining the server access password
     */
    public pass: string,

    /**
     * Variable for defining the server access user
     */
    public user: string,

    /**
     * Variable to define the email that will be described as who sent the respective email
     */
    public from: string,
  ) {}
}
