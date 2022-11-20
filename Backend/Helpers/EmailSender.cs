using SendGrid;
using SendGrid.Helpers.Mail;
using System.Net.Mail;

namespace Backend.Helpers
{

    public class EmailSender
    {
        /// <summary>
        /// Envía un email a la dirección de correo electrónico ingresada.
        /// </summary>
        /// <param name="clientName">El nombre del cliente que recibirá el correo electrónico</param>
        /// <param name="clientEmail">La dirección de correo electrónico a la que se enviará el email</param>
        /// <param name="subject">El asunto del email</param>
        /// <param name="body">El cuerpo del email</param>
        public static async Task SendEmailAsync(string clientName,
                                                string clientEmail,
                                                string emailSubject,
                                                string emailBody)
        {
            DotNetEnv.Env.TraversePath().Load();
            string apiKey = DotNetEnv.Env.GetString("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);

            var fromEmail = new EmailAddress("antoca29@gmail.com", "UbyTEC");
            var toEmail = new EmailAddress(clientEmail, clientName);

            var plainTextContent = emailBody;
            var htmlContent = $"<h1>{emailBody}</h1>";
            var msg = MailHelper.CreateSingleEmail(fromEmail,
                                                   toEmail,
                                                   emailSubject,
                                                   plainTextContent,
                                                   htmlContent);

            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
        }
        public static string GenerateRandomPassword()
        {
            int passwordLength = 12;
            string password = "";

            Random random = new Random();
            for (int i = 0; i < passwordLength; i++)
            {
                password += (char)random.Next(35, 126);
            }

            return password;
        }
    }

}