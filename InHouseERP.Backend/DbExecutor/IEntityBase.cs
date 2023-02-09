using System;

namespace DbExecutor
{
    public interface IEntityBase
    {
        int CreatorId { get; set; }
        DateTime CreateDate { get; set; }
        int UpdatorId { get; set; }
        DateTime UpdateDate { get; set; }
    }
}