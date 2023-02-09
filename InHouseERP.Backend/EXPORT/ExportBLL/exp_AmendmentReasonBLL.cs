using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_AmendmentReasonBLL //: IDisposible
    {
        public exp_AmendmentReasonBLL()
        {
            //exp_AmendmentReasonDAO = exp_AmendmentReason.GetInstanceThreadSafe;
            exp_AmendmentReasonDAO = new exp_AmendmentReasonDAO();
        }

        public exp_AmendmentReasonDAO exp_AmendmentReasonDAO { get; set; }

        public List<exp_AmendmentReason> GetAll()
        {
            try
            {
                return exp_AmendmentReasonDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_AmendmentReason> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return exp_AmendmentReasonDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_AmendmentReason> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return exp_AmendmentReasonDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(exp_AmendmentReason _exp_AmendmentReason)
        {
            try
            {
                return exp_AmendmentReasonDAO.Add(_exp_AmendmentReason);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(exp_AmendmentReason _exp_AmendmentReason)
        {
            try
            {
                return exp_AmendmentReasonDAO.Update(_exp_AmendmentReason);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int amendmentReasonId)
        {
            try
            {
                return exp_AmendmentReasonDAO.Delete(amendmentReasonId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}