namespace WeytBackend.Application.DTO
{
    public class UserSignUpDTO
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
