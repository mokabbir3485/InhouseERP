using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockReceiveExtraInfoBLL //: IDisposible
    {
        public inv_StockReceiveExtraInfoBLL()
        {
            //inv_StockReceiveExtraInfoDAO = inv_StockReceiveExtraInfo.GetInstanceThreadSafe;
            inv_StockReceiveExtraInfoDAO = new inv_StockReceiveExtraInfoDAO();
        }

        public inv_StockReceiveExtraInfoDAO inv_StockReceiveExtraInfoDAO { get; set; }

        public List<inv_StockReceiveExtraInfo> GetAll()
        {
            try
            {
                return inv_StockReceiveExtraInfoDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockReceiveExtraInfo _inv_StockReceiveExtraInfo)
        {
            try
            {
                return inv_StockReceiveExtraInfoDAO.Add(_inv_StockReceiveExtraInfo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_StockReceiveExtraInfo _inv_StockReceiveExtraInfo)
        {
            try
            {
                return inv_StockReceiveExtraInfoDAO.Update(_inv_StockReceiveExtraInfo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long SRExtraInfoId)
        {
            try
            {
                return inv_StockReceiveExtraInfoDAO.Delete(SRExtraInfoId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}