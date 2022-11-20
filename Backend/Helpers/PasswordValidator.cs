using Backend.Data;
namespace Backend.Models;

public class PasswordValidator
{

  // Checks if the password is correct
  public static bool ValidatePassword(string username, string passwordInput, string userType)
  {
    try
    {
      string hashedPassword = "";
      if (userType == "administrator")
      {
        hashedPassword = PasswordData.getAdminPassword(username);
      }
      else if (userType == "manager")
      {
        hashedPassword = PasswordData.getManagerPassword(username);
      }
      else if (userType == "client")
      {
        hashedPassword = PasswordData.getClientPassword(username);
      }
      else
      {
        return false;
      }

      return BCrypt.Net.BCrypt.Verify(passwordInput, hashedPassword);
    }
    catch (System.Exception)
    {
      return false;
    }
  }
}
