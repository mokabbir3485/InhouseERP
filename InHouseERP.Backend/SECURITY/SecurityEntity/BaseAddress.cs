namespace SecurityEntity
{
    public abstract class BaseAddress
    {
        public int AddressId { get; set; }
        public string AddressType { get; set; }
        public string Address { get; set; }
        public string ContactPerson { get; set; }
        public string ContactDesignation { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public bool IsDefault { get; set; }
        public string Status { get; set; }
    }
}