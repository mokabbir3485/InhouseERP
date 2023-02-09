using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_PaymentProcessBLL //: IDisposible
    {
        public exp_PaymentProcessBLL()
        {
            //exp_PaymentProcessDAO = exp_PaymentProcess.GetInstanceThreadSafe;
            exp_PaymentProcessDAO = new exp_PaymentProcessDAO();
        }

        public exp_PaymentProcessDAO exp_PaymentProcessDAO { get; set; }

        public List<exp_PaymentProcess> GetAll()
        {
            try
            {
                return exp_PaymentProcessDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_PaymentProcess> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return exp_PaymentProcessDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_PaymentProcess> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return exp_PaymentProcessDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public long Add(exp_PaymentProcess _exp_PaymentProcess)
        {
            try
            {
                return exp_PaymentProcessDAO.Add(_exp_PaymentProcess);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Update(exp_PaymentProcess _exp_PaymentProcess)
        {
            try
            {
                return exp_PaymentProcessDAO.Update(_exp_PaymentProcess);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long paymentProcessId)
        {
            try
            {
                return exp_PaymentProcessDAO.Delete(paymentProcessId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}