using System;

namespace PosEntity
{
    public class pos_Shift
    {
        public long ShiftId { get; set; }
        public int DepartmentId { get; set; }
        public int UserId { get; set; }
        public int CurrencyId { get; set; }
        public DateTime OpenTime { get; set; }
        public decimal SystemOpenCash { get; set; }
        public decimal InputOpenCash { get; set; }
        public decimal OwnCashIn { get; set; }
        public bool IsClose { get; set; }
        public DateTime? CloseTime { get; set; }
        public decimal? WithdrawnCash { get; set; }
        public decimal? SystemCloseBalance { get; set; }
        public decimal? InputCloseBalance { get; set; }
        public decimal? SystemCloseCash { get; set; }
        public decimal? InputCloseCash { get; set; }
        public decimal? OwnCashOut { get; set; }
        public int BranchId { get; set; }
        public string GroupName { get; set; }
        public string BranchName { get; set; }
        public string DepartmentName { get; set; }
        public string EmployeeName { get; set; }
    }
}