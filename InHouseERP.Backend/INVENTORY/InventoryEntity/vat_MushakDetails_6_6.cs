using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
   public class vat_MushakDetails_6_6
    {
        public int DetailId { get; set; }
        public int IssueId { get; set; }
        public string TrChallanNo { get; set; }
        public DateTime TrChallanDate { get; set; }
        public int PBId { get; set; }
        public decimal TotalBillAmount { get; set; }
        public decimal TotalVATAmount { get; set; }
        public decimal TotalVDSAmount { get; set; }
    
        public decimal IsLocal { get; set; }
        public string Remarks { get; set; }
    }
}
