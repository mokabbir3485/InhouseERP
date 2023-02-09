using System;
using System.Text;

namespace SecurityEntity
{
	public class ad_StockDeclarationType
	{
		public Int32  DeclarationTypeId { get; set; }
		public string  DeclarationTypeName { get; set; }
		public bool IsActive { get; set; }
		public Int32  CreatorId { get; set; }
		public DateTime  CreateDate { get; set; }
		public Int32  UpdatorId { get; set; }
		public DateTime  UpdateDate { get; set; }
        public string Status { get; set; }
	}
}
