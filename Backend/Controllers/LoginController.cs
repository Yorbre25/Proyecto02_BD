using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("login")]
public class LoginController : Controller
{
  [HttpPost]
  [Route("admin")]
  public object adminLogin([FromBody] LoginInfo loginInfo)
  {
    bool validPassword = PasswordValidator.ValidatePassword(
      loginInfo.username,
      loginInfo.password,
      "administrator"
    );

    if (validPassword)
    {
      return new
      {
        status = "ok",
      };
    }
    else
    {
      return new
      {
        status = "error",
        message = "Correo y/o contraseña incorrectos"
      };
    }
  }

  [HttpPost]
  [Route("manager")]
  public void managerLogin([FromBody] LoginInfo loginInfo)
  {

  }

  [HttpPost]
  [Route("client")]
  public void clientLogin([FromBody] LoginInfo loginInfo)
  {

  }
}

// Stores user username and password.
public struct LoginInfo
{
  public string username { get; set; }
  public string password { get; set; }

  public LoginInfo(string username, string password)
  {
    this.username = username;
    this.password = password;
  }
}