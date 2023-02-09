using System.Collections.Generic;

namespace SecurityEntity
{
    public class s_Screen
    {
        public int ScreenId { get; set; }
        public int ModuleId { get; set; }
        public int FunctionId { get; set; }
        public string FunctionIds { get; set; }
        public string ScreenName { get; set; }
        public string Description { get; set; }
        public string ScreenUrl { get; set; }
        public string ImageUrl { get; set; }
        public bool IsPage { get; set; }
        public string Status { get; set; }
        public int Sorting { get; set; }
        public string ModuleName { get; set; }
        public string MainTableName { get; set; }

        public List<s_ScreenDetail> ScreenDetailList { get; set; }


    }
}