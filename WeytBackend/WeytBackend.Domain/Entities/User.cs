
namespace WeytBackend.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
       
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; } 
        public string Email { get; set; }
        public string Password { get; set; }

        public string Avatar { get; set; }
        public Boolean IsAdmin { get; set; }
        public Boolean IsActive { get; set; }
    }
}
