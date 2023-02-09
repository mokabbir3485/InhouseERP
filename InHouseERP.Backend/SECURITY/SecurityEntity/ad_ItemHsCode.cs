using System;

namespace SecurityEntity
{
    public class ad_ItemHsCode
    {
        public int HsCodeId { get; set; }
        public string HsCode { get; set; }
        public string Description { get; set; }

        public decimal CD { get; set; }
        public decimal SD { get; set; }
        public decimal RD { get; set; }
        public decimal VAT { get; set; }
        public decimal AT { get; set; }
        public decimal AIT { get; set; }
        public decimal TTI { get; set; }
        public bool IsActive { get; set; }
        public int UpdateBy { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}