using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryBLL
{
    public class inv_InternalWorkOrderBLL //: IDisposible
    {
        public inv_InternalWorkOrderBLL()
        {
            //inv_InternalWorkOrderDAO = inv_InternalWorkOrder.GetInstanceThreadSafe;
            inv_InternalWorkOrderDAO = new inv_InternalWorkOrderDAO();
        }

        public inv_InternalWorkOrderDAO inv_InternalWorkOrderDAO { get; set; }

        public List<inv_InternalWorkOrder> inv_InternalWorkOrderAmendment_GetForEdit(string approvalType,
            string approvalPassword)
        {
            try
            {
                return inv_InternalWorkOrderDAO.inv_InternalWorkOrderAmendment_GetForEdit(approvalType,
                    approvalPassword);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrder> GetAll()
        {
            try
            {
                return inv_InternalWorkOrderDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<inv_InternalWorkOrderTemp> ProductionWiseInternalWorkOrder(int DepartmentId,int StockTransferTypeId)
        {
            try
            {
                return inv_InternalWorkOrderDAO.ProductionWiseInternalWorkOrder(DepartmentId, StockTransferTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


      
        public List<inv_InternalWorkOrder> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_InternalWorkOrderDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrder> inv_InternalWorkOrder_ForProduction()
        {
            try
            {
                return inv_InternalWorkOrderDAO.inv_InternalWorkOrder_ForProduction();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrder> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_InternalWorkOrderDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Add(inv_InternalWorkOrder _inv_InternalWorkOrder)
        {
            try
            {
                return inv_InternalWorkOrderDAO.Add(_inv_InternalWorkOrder);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_InternalWorkOrder _inv_InternalWorkOrder)
        {
            try
            {
                return inv_InternalWorkOrderDAO.Update(_inv_InternalWorkOrder);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(inv_InternalWorkOrder _inv_InternalWorkOrder)
        {
            try
            {
                return inv_InternalWorkOrderDAO.UpdateApprove(_inv_InternalWorkOrder);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long internalWorkOrderId)
        {
            try
            {
                return inv_InternalWorkOrderDAO.Delete(internalWorkOrderId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxInternalWorkerNo(DateTime iwDate)
        {
            try
            {
                return inv_InternalWorkOrderDAO.GetMaxInternalWorkerNo(iwDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<inv_InternalWorkOrder> GetBy_inv_CIFProductReports(string CompanyId, Int32? PreparedById = null, DateTime? startDate = null,
            DateTime? endDate = null)
        {
            try
            {
                return inv_InternalWorkOrderDAO.GetBy_inv_CIFProductReports(CompanyId, PreparedById, startDate, endDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalWorkOrder> GetProductionStatusByNoAndDate(string ProductionOrIWONo, DateTime? FromDate,
            DateTime? ToDate)
        {
            try
            {
                return inv_InternalWorkOrderDAO.GetProductionStatusByNoAndDate(ProductionOrIWONo, FromDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<inv_InternalWorkOrder> GetBy_inv_CIFCustomerReports(long CompanyId)
        {
            try
            {
                return inv_InternalWorkOrderDAO.GetBy_inv_CIFCustomerReports(CompanyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}