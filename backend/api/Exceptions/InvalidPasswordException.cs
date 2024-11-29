namespace api.Exceptions
{
    public class InvalidPasswordException : Exception
    {
        public InvalidPasswordException()
            : base("Неверный пароль.") { }
    }
}
