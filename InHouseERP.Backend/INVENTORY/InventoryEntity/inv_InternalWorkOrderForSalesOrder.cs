using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
  public class inv_InternalWorkOrderForSalesOrder
    {
        public long SalesOrderDetailId { get; set; }
        public long SalesOrderId { get; set; }
        public long ItemAddAttId { get; set; }
        public long SODAddId { get; set; }
        public int OrderUnitId { get; set; }
        public int ItemId { get; set; }
        public int HsCodeId { get; set; }
        public int MaterialTypeId { get; set; }
        public string HsCode { get; set; }
        public string SalesOrderNo { get; set; }
        public string ReferenceNo { get; set; }
        public int CompanyId { get; set; }
        public decimal OrderQty { get; set; }
        public decimal Charge { get; set; }
        public decimal OrderPrice { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime SalesOrderDate { get; set; }
        public decimal DeliveredQty { get; set; }
        public decimal TotalAmt { get; set; }
        public decimal TotalQty { get; set; }
        public string OrderQtyString { get; set; }
        public string Remarks { get; set; }
        public string QtySummary { get; set; }
        public string CurrencyType { get; set; }
        public string CategoryName { get; set; }
        public string AmountInWords { get; set; }
        public string TotalAmtString { get; set; }
        public string PONos { get; set; }
        public string ItemDescription { get; set; }
        public string ItemDescriptionTwo { get; set; }
        public string BuyerName { get; set; }
        public string Combination { get; set; }
        public string GroupName { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string CompanyDeliveryName { get; set; }
        public string CompanyDeliveryAddress { get; set; }
        public string BranchAddress { get; set; }
        public string FactoryAddress { get; set; }
        public string BranchEmail { get; set; }
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string SubCategoryName { get; set; }
        public int UnitId { get; set; }
        public string UnitName { get; set; }
        public int PackageId { get; set; }
        public decimal UnitPerPackage { get; set; }
        public int ContainerId { get; set; }
        public decimal PackagePerContainer { get; set; }
        public decimal PackageWeight { get; set; }
        public decimal ContainerWeight { get; set; }
        public string ContainerSize { get; set; }

        public decimal Amount { get; set; }
        public decimal PcPerUnit { get; set; }
        public decimal PcPerRoll { get; set; }
        public decimal RollPerCarton { get; set; }
        public decimal UnitPerCarton { get; set; }
        public decimal RollWeight { get; set; }
        public decimal CartonWeight { get; set; }
        public string CartonSize { get; set; }
        public decimal OrderPriceBDT { get; set; }
        public bool IsCPT { get; set; }
        public Decimal? CPTCost { get; set; }
        public string AddressDelivery { get; set; }
        public string RollDirection { get; set; }
        public string Ups { get; set; }
        public Int32 CategoryId { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string PrepareByName { get; set; }
        public string MaterialTypeName { get; set; }
        public string PaperTypeName { get; set; }
        public int PaperTypeId { get; set; }
      
        public int PreparedById { get; set; }
        public int PreparedBySectionId { get; set; }
        public int FinishedItemId { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public bool IsVoid { get; set; }
        public string FinishedItemName { get; set; }
        public int LabelBrandId { get; set; }




    }


}
