using System;
using System.Collections.Generic;
using ReceivableDAL;
using ReceivableEntity;

namespace ReceivableBLL
{
    public class rcv_SaleAdjustmentBLL //: IDisposible
    {
        public rcv_SaleAdjustmentBLL()
        {
            //rcv_SaleAdjustmentDAO = rcv_SaleAdjustment.GetInstanceThreadSafe;
            rcv_SaleAdjustmentDAO = new rcv_SaleAdjustmentDAO();
        }

        public rcv_SaleAdjustmentDAO rcv_SaleAdjustmentDAO { get; set; }

        public List<rcv_SaleAdjustment> GetAll()
        {
            try
            {
                return rcv_SaleAdjustmentDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_SaleAdjustment> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return rcv_SaleAdjustmentDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_SaleAdjustment> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return rcv_SaleAdjustmentDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(rcv_SaleAdjustment _rcv_SaleAdjustment)
        {
            try
            {
                return rcv_SaleAdjustmentDAO.Add(_rcv_SaleAdjustment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(rcv_SaleAdjustment _rcv_SaleAdjustment)
        {
            try
            {
                return rcv_SaleAdjustmentDAO.Update(_rcv_SaleAdjustment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long adjustmentId)
        {
            try
            {
                return rcv_SaleAdjustmentDAO.Delete(adjustmentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}