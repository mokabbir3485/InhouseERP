using System;

namespace InventoryEntity
{
    public class xrpt_inv_Report
    {
        /// <summary>
        ///     Material Demanded Issued Report
        /// </summary>
        public Int64 ReportId { get; set; }

        public string ReportType { get; set; }
        public Int64 ItemId { get; set; }
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public decimal KgPerRoll { get; set; }
        public decimal ItemLength { get; set; }
        public decimal ItemWidth { get; set; }
        public string IWOorPONo { get; set; }
        public string MCNo { get; set; }
        public decimal DemandedKg { get; set; }
        public decimal DemandedMeter { get; set; }
        public decimal DemandedSqm { get; set; }
        public decimal DemandedRoll { get; set; }
        public decimal IssuedKg { get; set; }
        public decimal IssuedMeter { get; set; }
        public decimal IssuedSqm { get; set; }
        public decimal IssuedRoll { get; set; }
        public string DemandedNo { get; set; }
        public DateTime? DemandedDate { get; set; }
        public string IssuedNo { get; set; }
        public DateTime? IssuedDate { get; set; }
        public string Category { get; set; }

        //////////////////////////////MaterialReturnReport
        public decimal ReturnKg { get; set; }
        public decimal ReturnMeter { get; set; }
        public decimal ReturnSqm { get; set; }
        public decimal ReturnRoll { get; set; }
        public decimal ReceivedKg { get; set; }
        public decimal ReceivedMeter { get; set; }
        public decimal ReceivedSqm { get; set; }
        public decimal ReceivedRoll { get; set; }

        ///////////////////////////////////ISTM
        public string ProductSize { get; set; }
        public string CustomerName { get; set; }
        public decimal RollPerPcs { get; set; }
        public decimal NoOfRoll { get; set; }
        public decimal NoOfBox { get; set; }
        public decimal Qty { get; set; }
        public decimal SupplyQty { get; set; }
        public string Remarks { get; set; }
        public string FromDepartmentName { get; set; }
        public string ToDepartmentName { get; set; }
        public string FinishItemName { get; set; }
        public string MaterialItemName { get; set; }
        public string MaterialTypeName { get; set; }
        public string To_MaterialTypeName { get; set; }
        public string UnitName { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public string ToDepartment { get; set; }
        public string FromDepartment { get; set; }
        public decimal OrderPrice { get; set; }
        public decimal UnitPerPackage { get; set; }
        public decimal OrderQty { get; set; }
        public decimal QtyPerRoll { get; set; }
        public int OrderUnitId { get; set; }
        public decimal RequisitionQuantity { get; set; }
        public string BranchAddress { get; set; }
        public decimal PcPerRoll { get; set; }
        public decimal RollPerCarton { get; set; }

        public string To_ItemName { get; set; }
        public int StockTransferTypeId { get; set; }
        public Int32 ExceedOrShortage { get; set; }
        public DateTime StockTransferDate { get; set; }
        public string LabelBrandName { get; set; }
        public decimal IssueQuantity { get; set; }
        public string DepartmentName { get; set; }
        public string TransferType { get; set; }
    

   
      

       
       

    }
}