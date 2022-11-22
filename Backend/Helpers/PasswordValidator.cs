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
    else if (userType == "manager")
    {
      ManagerPasswordInfo managerPasswordInfo = PasswordData.getManagerPassword(username);

      if (managerPasswordInfo.status == false)
      {
        throw new Exception($@"Inicio de sesión no habilitado{'\n'}Motivo: {managerPasswordInfo.observation}");
      }
      else
      {
        return BCrypt.Net.BCrypt.Verify(passwordInput, managerPasswordInfo.password);
      }
    }
    else if (userType == "client")
    {
      hashedPassword = PasswordData.getClientPassword(username);
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
}