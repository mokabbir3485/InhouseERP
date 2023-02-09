using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_SupplierAddress : BaseAddress, IEntityBase
    {
        public int SupplierId { get; set; }
        public int AddressId { get; set; }
        public string AddressType { get; set; }
        public string Address { get; set; }
        public string ContactPerson { get; set; }
        public string ContactDesignation { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Fax { get; set; }
        public string Port { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}