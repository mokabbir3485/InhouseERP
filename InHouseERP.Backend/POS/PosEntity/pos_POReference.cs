using System;

namespace PosEntity
{
    public class pos_POReference
    {
        public long POReferenceId { set; get; }
        public long DocumentId { set; get; }
        public string DocType { set; get; }
        public string PONo { set; get; }
        public DateTime PODate { set; get; }
        public string AttachmentName { set; get; }
    }
}