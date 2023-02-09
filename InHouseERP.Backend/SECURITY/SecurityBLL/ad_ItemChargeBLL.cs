using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemChargeBLL //: IDisposible
    {
        public ad_ItemChargeBLL()
        {
            //ad_ItemChargeDAO = ad_ItemCharge.GetInstanceThreadSafe;
            ad_ItemChargeDAO = new ad_ItemChargeDAO();
        }

        public ad_ItemChargeDAO ad_ItemChargeDAO { get; set; }

        public List<ad_ItemCharge> GetByItemId(int itemId)
        {
            try
            {
                return ad_ItemChargeDAO.GetByItemId(itemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(ad_ItemCharge ad_ItemCharge)
        {
            try
            {
                return ad_ItemChargeDAO.Add(ad_ItemCharge);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}