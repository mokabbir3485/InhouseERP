using System;

namespace SecurityEntity
{
    public class ad_Company
    {
        public int CompanyId { get; set; }
        public int SupplierId { get; set; }
        public int SectionId { get; set; }
        public int CompanyWiseSupplierId { get; set; }
        public bool IsSupplier { get; set; }
        public int CompanyTypeId { get; set; }
        public int RefEmployeeId { get; set; }
        public string CompanyCode { get; set; }
        public string CompanyName { get; set; }
        public string Web { get; set; }
        public bool IsActive { get; set; }
        public bool IsPayable { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int? UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string Status { get; set; }
        public string CompanyTypeName { get; set; }
        public string RefEmail { get; set; }
        public string RefEmployeeName { get; set; }
        public string RefContactNo { get; set; }
        public string ContactPerson { get; set; }
        public string ContactDesignation { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }

        public string CompanyNameBilling { get; set; }
        public string AddressBilling { get; set; }
        public string CompanyNameDelivery { get; set; }
        public string AddressDelivery { get; set; }
        public string Name { get; set; }
        public int Id { get; set; }
    }
}