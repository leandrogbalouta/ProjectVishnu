using Microsoft.AspNetCore.Identity;

namespace ProjectVishnu.ServerApp.App.Models
{
    public class User : IdentityUser
    {
        public User()
        {
        }

        public User(string userName) : base(userName)
        {
        }
    }
}
