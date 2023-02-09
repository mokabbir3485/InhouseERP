using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemStateBLL //: IDisposible
    {
        public ad_ItemStateBLL()
        {
            //ad_ItemStateDAO = ad_ItemState.GetInstanceThreadSafe;
            ad_ItemStateDAO = new ad_ItemStateDAO();
        }

        public ad_ItemStateDAO ad_ItemStateDAO { get; set; }

        public List<ad_ItemState> GetAll()
        {
            try
            {
                return ad_ItemStateDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemState ad_ItemState)
        {
            try
            {
                return ad_ItemStateDAO.Add(ad_ItemState);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_ItemState ad_ItemState)
        {
            try
            {
                return ad_ItemStateDAO.Update(ad_ItemState);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int itemStateId)
        {
            try
            {
                return ad_ItemStateDAO.Delete(itemStateId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}