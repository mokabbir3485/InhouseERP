using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryBLL
{
    public class inv_InternalWorkOrderDetailBLL //: IDisposible
    {
        public inv_InternalWorkOrderDetailBLL()
        {
            //inv_InternalWorkOrderDetailDAO = inv_InternalWorkOrderDetail.GetInstanceThreadSafe;
            inv_InternalWorkOrderDetailDAO = new inv_InternalWorkOrderDetailDAO();
        }

        public inv_InternalWorkOrderDetailDAO inv_InternalWorkOrderDetailDAO { get; set; }

        public List<inv_InternalWorkOrderDetail> GetByInternalWorkOrderId(long internalWorkOrderId)
        {
            try
            {
                return inv_InternalWorkOrderDetailDAO.GetByInternalWorkOrderId(internalWorkOrderId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrderDetail> GetByInternalWorkOrderIdForProduction(long internalWorkOrderId)
        {
            try
            {
                return inv_InternalWorkOrderDetailDAO.GetByInternalWorkOrderIdForProduction(internalWorkOrderId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrderDetail> GetByInternalWorkOrderIdForRequisition(long internalWorkOrderId)
        {
            try
            {
                return inv_InternalWorkOrderDetailDAO.GetByInternalWorkOrderIdForRequisition(internalWorkOrderId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrderForSalesOrder> IWOItemResetWithGetBySOItemForLoad(Int64 SalesOrderId)
        {
            try
            {
                return inv_InternalWorkOrderDetailDAO.IWOItemResetWithGetBySOItemForLoad(SalesOrderId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrderForSalesOrder> InternalWorkOrderGetMaxNoBySalesOrderId(Int32 SalesOrderId)
        {
            try
            {
                return inv_InternalWorkOrderDetailDAO.InternalWorkOrderGetMaxNoBySalesOrderId(SalesOrderId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        

        public List<inv_InternalWorkOrderDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_InternalWorkOrderDetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrderDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_InternalWorkOrderDetailDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_InternalWorkOrderDetail _inv_InternalWorkOrderDetail)
        {
            try
            {
                return inv_InternalWorkOrderDetailDAO.Add(_inv_InternalWorkOrderDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_InternalWorkOrderDetail _inv_InternalWorkOrderDetail)
        {
            try
            {
                return inv_InternalWorkOrderDetailDAO.Update(_inv_InternalWorkOrderDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public int InternalWorkOrderDetail_For_UpdateArtWork(long internalWorkOrderDetailId)
        {
            try
            {
                return inv_InternalWorkOrderDetailDAO.InternalWorkOrderDetail_For_UpdateArtWork(
                    internalWorkOrderDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long IWODetailDelete(long InternalWorkOrderDetailId)
        {
            try
            {
                return inv_InternalWorkOrderDetailDAO.IWODetailDelete(InternalWorkOrderDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int IWOUpdatedItemForDelete(long internalWorkOrderDetailId)
        {
            try
            {
                return inv_InternalWorkOrderDetailDAO.IWOUpdatedItemForDelete(internalWorkOrderDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}