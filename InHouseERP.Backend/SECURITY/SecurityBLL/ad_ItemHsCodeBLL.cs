using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemHsCodeBLL //: IDisposible
    {
        public ad_ItemHsCodeBLL()
        {
            //ad_ItemHsCodeDAO = ad_Item.GetInstanceThreadSafe;
            ad_ItemHsCodeDAO = new ad_ItemHsCodeDAO();
        }

        public ad_ItemHsCodeDAO ad_ItemHsCodeDAO { get; set; }

        public List<ad_ItemHsCode> Get(int? hsCodeId = null)
        {
            try
            {
                return ad_ItemHsCodeDAO.Get(hsCodeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}