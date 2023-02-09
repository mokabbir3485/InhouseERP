using System;

namespace ExportEntity
{
    public class xRpt_expimp_TotalRawMaterialAndMachineryStatus
    {
        public long PBDetailId { get; set; }
        public long PBId { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string SupplierName { get; set; }
        public string ShipmentInfo { get; set; }
        public string Address { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime InvoiceDate { get; set; }

        public string LCorPONo { get; set; }
        public DateTime LCorPODate { get; set; }

        public string ImportPermitNo { get; set; }
        public DateTime ImportPermitDate { get; set; }

        public DateTime PBDate { get; set; }
        public string PBNo { get; set; }

        public string BillOfEntryNo { get; set; }
        public DateTime BillOfEntryDate { get; set; }
        public string BondNo { get; set; }
        public DateTime BondDate { get; set; }

        public decimal Amount { get; set; }
        public decimal PBQtyInKG { get; set; }
        public string Remarks { get; set; }

        public int PBUnitId { get; set; }
        public long BondId { get; set; }
        public decimal Qty { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal PBPrice { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TotalCostAfterDiscount { get; set; }
        public string CurrencyType { get; set; }
        public decimal ConversionRate { get; set; }
        public decimal TotalConversion { get; set; }
        public decimal TotalCost { get; set; }
        public decimal FinalUnitPrice { get; set; }
        public int MaterialTypeId { get; set; }
        public long POId { get; set; }
        public bool isRawMaterials { get; set; }
        public decimal AdditionDiscount { get; set; }
        
    }
}