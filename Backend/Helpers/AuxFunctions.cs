namespace Backend.Helpers;

public class AuxFunctions
{
  public static string arrayToString(string[] array)
  {
    string result = "[";
    for (int i = 0; i < array.Length; i++)
    {
      if (i < (array.Length - 1))
      {
        result += $@"'{array[i]}',";

      }
      else
      {
        result += $@"'{array[i]}']";

      }
    }

    return result;
  }
}