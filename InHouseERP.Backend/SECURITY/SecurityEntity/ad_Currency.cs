using System;
using DbExecutor;

namespace SecurityEntity
{
    public class ad_Currency : IEntityBase
    {
        public int CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public string CurrencyShort { get; set; }
        public bool IsActive { get; set; }
        public bool IsDefault { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}