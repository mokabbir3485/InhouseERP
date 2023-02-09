using System;

namespace InventoryEntity
{
    public class proc_ImportPurchaseBill_Mushak
    {
        public long PBDetailId { get; set; }
        public long PBId { get; set; }
        public long ItemId { get; set; }
        public long PBUnitId { get; set; }
        public decimal PBQty { get; set; }
        public decimal PBPrice { get; set; }
        public long SupplierId { get; set; }
        public string SupplierName { get; set; }

        public string ItemName { get; set; }
        public string UnitName { get; set; }
        public string HsCode { get; set; }
        public string CdPercentage { get; set; }
        public decimal CdAmount { get; set; }
        public string RdPercentage { get; set; }
        public decimal RdAmount { get; set; }
        public string SdPercentage { get; set; }
        public decimal SdAmount { get; set; }
        public string VatPercentage { get; set; }
        public decimal VatAmount { get; set; }

        public string AitPercentage { get; set; }
        public decimal AitAmount { get; set; }
        public string AtPercentage { get; set; }
        public decimal AtAmount { get; set; }
        public string tiPercentage { get; set; }
        public decimal TtiAmount { get; set; }


        public decimal PreStockMaterialsQTY { get; set; }
        public decimal PreStockMaterialsPrice { get; set; }

        public decimal PostStockMaterialsQTY { get; set; }
        public decimal PostStockMaterialsPrice { get; set; }

        public string Date { get; set; }
        public decimal TotalQty { get; set; }
        public decimal TotakPrice { get; set; }
        public string Remarks { get; set; }
        public string BillOfEntryNo { get; set; }
        public string NID { get; set; }

        public DateTime PBDate { get; set; }
        public string Address { get; set; }


        //Musuk 6_2
        public decimal PreProductionMaterialsQTY { get; set; }
        public decimal PreProductionMaterialsPrice { get; set; }
        public decimal ProductionMarginal { get; set; }
        public decimal ProductionMarginalPrice { get; set; }

        public decimal TotalProductionQty { get; set; }
        public decimal TotalProductionPrice { get; set; }
    }
}