using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
    public class proc_LocalPurchaseBillDetailSave
    {
        public Int64 LPBId { get; set; }
        public Int64 LPBDetailId { get; set; }
        public Int32 CategoryId { get; set; }
        public Int32 SubCategoryId { get; set; }
        public Int64 ItemId { get; set; }
        public Int32 MaterialTypeId { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public string ItemDescriptionTwo { get; set; }
        public Int32 HsCodeId { get; set; }
        public decimal RollWidthInMeter { get; set; }
        public decimal RollLenghtInMeter { get; set; }
        public decimal PcPerRoll { get; set; }
        public decimal RollPerCarton { get; set; }
        public decimal UnitPerCarton { get; set; }
        public decimal RollWeight { get; set; }
        public decimal CartonWeight { get; set; }
        public string CartonSize { get; set; }
        public Int32 UnitId { get; set; }
        public decimal Qty { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal RollAreaInSqMeter { get; set; }
        public decimal Amount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TotalCost { get; set; }
        public decimal SdAmount { get; set; }
        public decimal VatAmount { get; set; }
    }
}



