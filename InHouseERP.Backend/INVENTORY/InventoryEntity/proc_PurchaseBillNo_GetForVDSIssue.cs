using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
   public class proc_PurchaseBillNo_GetForVDSIssue
    {
        public Int64 LPBId { get; set; }
        public Int64 PBId { get; set; }
        public string PBNo { get; set; }
        public DateTime PBDate { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public int CreatorId { get; set; }
        public int UpdatorId { get; set; }
        public Int64 SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string Remarks { get; set; }
        public decimal TotalVAT { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal BillAmount { get; set; }
        public decimal TotalSD { get; set; }
        public bool isVDS { get; set; }
        public decimal TotalAIT { get; set; }
        public bool IsLocal { get; set; }
        public string PaidFor { get; set; }
    }
}
