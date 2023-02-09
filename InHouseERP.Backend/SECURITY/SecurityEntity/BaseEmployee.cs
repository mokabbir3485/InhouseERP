using System;

namespace SecurityEntity
{
    public abstract class BaseEmployee
    {
        public int EmployeeId { get; set; }
        public int DesignationId { get; set; }
        public string EmployeeCode { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string PresentAddress { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }
}