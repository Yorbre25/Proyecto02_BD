using Backend.Data;
namespace Backend.Models;

public class PasswordValidator
{

    // Checks if the password is correct
    public static bool ValidatePassword(string username, string passwordInput, string userType)
    {

        string hashedPassword = "";
        if (userType == "administrator")
        {
            hashedPassword = PasswordData.getAdminPassword(username);
        }
        else if (userType == "client")
        {
            hashedPassword = PasswordData.getClientPassword(username)[0];
        }
        else if (userType == "deliveryman")
        {
            hashedPassword = PasswordData.getDelManPassword(username);
        }
        else
        {
            return false;
        }

        return BCrypt.Net.BCrypt.Verify(passwordInput, hashedPassword);
    }

    public static int getClientID(string username)
    {
        return Convert.ToInt32(PasswordData.getClientPassword(username)[1]);
    }

    public static ManagerPasswordInfo ValidateManagerPassword(string username, string passwordInput)
    {
        ManagerPasswordInfo managerPasswordInfo = PasswordData.getManagerPassword(username);
        bool validPassword = BCrypt.Net.BCrypt.Verify(passwordInput, managerPasswordInfo.password);

        if (validPassword && !managerPasswordInfo.status)
        {
            throw new Exception($@"Inicio de sesión no habilitado{'\n'}Motivo: {managerPasswordInfo.observation}");
        }
        else
        {
            managerPasswordInfo.validPassword = validPassword;
            return managerPasswordInfo;
        }
    }
}