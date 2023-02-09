using System;

namespace ExportEntity
{
    public class xRpt_exp_PI_Detail
    {
        public string ItemName { get; set; }
        public int ItemId { get; set; }
        public string SubCategoryName { get; set; }
        public string ItemDescription { get; set; }
        public decimal OrderQty { get; set; }
        public decimal OrderPrice { get; set; }
        public decimal Amount { get; set; }
        public string HsCode { get; set; }
        public string BuyerName { get; set; }

        public string PONo { get; set; }
        public DateTime PODate { get; set; }
        public string Buyer_PO_PoDate { get; set; }
    }
}