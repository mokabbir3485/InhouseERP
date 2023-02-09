using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.SECURITY.SecurityEntity
{
   public class vat_Mushak_6_6_GetBySupplierId
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string PBNo { get; set; }
        public string ChallanNo { get; set; }
        public DateTime ChallanDate { get; set; }
        public string CodeNo { get; set; }
        public bool IsLocal { get; set; }
        public decimal TotalBillAmount { get; set; }
        public decimal TotalVATAmount { get; set; }
        public decimal TotalVDSAmount { get; set; }
        public Int32 PBId { get; set; }
    }
}
