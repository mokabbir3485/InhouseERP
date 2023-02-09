using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_PurchaseOrderDetailBLL //: IDisposible
    {
        public inv_PurchaseOrderDetailBLL()
        {
            //inv_PurchaseOrderDetailDAO = inv_PurchaseOrderDetail.GetInstanceThreadSafe;
            inv_PurchaseOrderDetailDAO = new inv_PurchaseOrderDetailDAO();
        }

        public inv_PurchaseOrderDetailDAO inv_PurchaseOrderDetailDAO { get; set; }

        public List<inv_PurchaseOrderDetail> GetAll()
        {
            try
            {
                return inv_PurchaseOrderDetailDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseOrderDetail> GetByPOId(long POId)
        {
            try
            {
                return inv_PurchaseOrderDetailDAO.GetByPOId(POId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long PostPODetail(inv_PurchaseOrderDetail PurchaseOrderDetail)
        {
            try
            {
                return inv_PurchaseOrderDetailDAO.PostPODetail(PurchaseOrderDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_PurchaseOrderDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_PurchaseOrderDetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}