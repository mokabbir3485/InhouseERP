using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
    public class xrpt_MushakDetails_6_6
    {
        public int IssueId { get; set; }
        public string IssueNo { get; set; }
        public string SupplierName { get; set; }
        public DateTime IssueDate { get; set; }
        public int SupplierId { get; set; }
        public int IssuedBy { get; set; }
        public int UpdatorId { get; set; }

        public int DetailId { get; set; }
   
        public string TrChallanNo { get; set; }
        public DateTime TrChallanDate { get; set; }
        public int PBId { get; set; }
        public decimal TotalBillAmount { get; set; }
        public decimal TotalVatAmount { get; set; }
        public decimal TotalVATAmount { get; set; }
        public decimal TotalVDSAmount { get; set; }
        public string DesignationName { get; set; }
        public string EmployeeName { get; set; }
        public string OrganizationName { get; set; }
        public string OrganizationBIN { get; set; }
        public string OrganizationAddress { get; set; }
        public string SupplierAddress { get; set; }
        public string SupplierBIN { get; set; }


        public bool IsLocal { get; set; }
        public string Remarks { get; set; }


    }
}
