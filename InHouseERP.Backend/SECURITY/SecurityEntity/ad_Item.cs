using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_Item : IEntityBase
    {
        public int ItemId { get; set; }
        public int SectionId { get; set; }
        public int ItemIdCount { get; set; }
        public int SubCategoryId { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public string ItemCombinationName { get; set; }
        public string ItemDescription { get; set; }
        public string ItemDescriptionTwo { get; set; }
        public bool IsItemCodeBarcode { get; set; }
        public int UnitId { get; set; }
        public int PackageId { get; set; }
        public decimal UnitPerPackage { get; set; }
        public int ContainerId { get; set; }
        public decimal PackagePerContainer { get; set; }
        public string PurchaseMeasurement { get; set; }
        public string SaleMeasurement { get; set; }
        public int PurchasePriceConfigId { get; set; }
        public int SalePriceConfigId { get; set; }
        public int MovementMethodId { get; set; }
        public int HardwareAttributeId { get; set; }
        public string AccountCode { get; set; }
        public bool IsActive { get; set; }
        public bool NoSerial { get; set; }
        public bool HasAddAtt { get; set; }
        public bool HasAddAttOperational { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
        public string Status { get; set; }
        public int PurchaseUnitId { get; set; }
        public int SaleUnitId { get; set; }
        public decimal DefaultPurPrice { get; set; }
        public decimal DefaultSalePrice { get; set; }
        public string UnitName { get; set; }
        public int ROLevel { get; set; }
        public decimal PackageWeight { get; set; }
        public decimal ContainerWeight { get; set; }
        public string ContainerSize { get; set; }
        public int HsCodeId { get; set; }
        public int MaterialTypeId { get; set; }
        public int LabelBrandId { get; set; }
        public string LabelBrandName { get; set; }
        public string HsCode { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public string UpdatorName { get; set; }
        public DateTime UpdateDate { get; set; }
        public int LabelId { get; set; }
        public int RibbonId { get; set; }
        public long Id { get; set; }

        public decimal OrderPrice { get; set; }

        public decimal PcPerRoll { get; set; }
        public decimal RollPerCarton { get; set; }
        public decimal UnitPerCarton { get; set; }
        public decimal RollWeight { get; set; }
        public decimal CartonWeight { get; set; }
        public string CartonSize { get; set; }
        public string CompanyNameBilling { get; set; }
        public decimal UnitPrice { get; set; }
    }
}