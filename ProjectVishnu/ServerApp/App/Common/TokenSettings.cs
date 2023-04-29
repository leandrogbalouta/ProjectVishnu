namespace ProjectVishnu.ServerApp.App.Common;
public class TokenSettings
{
    public static string Issuer { get => "dkm"; }
    public static string Audience { get => "dkm"; }
    public static string Key { get => "YeahManAGoodRandomKey<3LandroForPrez"; }
    public static DateTime Expiration { get => DateTime.Now.AddDays(1); }
}