using System;

namespace DbExecutor
{
    public class error_Log
    {
        public long ErrorId { get; set; }
        public DateTime ErrorDate { get; set; }
        public string ErrorSide { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorType { get; set; }
        public string FileName { get; set; }
        public string IpAddress { get; set; }
        public int UserId { get; set; }
        public bool IsSolved { get; set; }
    }
}