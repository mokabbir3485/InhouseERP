using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemWiseSupplierBLL //: IDisposible
    {
        public ad_ItemWiseSupplierBLL()
        {
            //ad_ItemWiseSupplierDAO = ad_ItemWiseSupplier.GetInstanceThreadSafe;
            ad_ItemWiseSupplierDAO = new ad_ItemWiseSupplierDAO();
        }

        public ad_ItemWiseSupplierDAO ad_ItemWiseSupplierDAO { get; set; }

        public List<ad_ItemWiseSupplier> GetByItemId(int itemId)
        {
            try
            {
                return ad_ItemWiseSupplierDAO.GetByItemId(itemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemWiseSupplier ad_ItemWiseSupplier)
        {
            try
            {
                return ad_ItemWiseSupplierDAO.Add(ad_ItemWiseSupplier);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}