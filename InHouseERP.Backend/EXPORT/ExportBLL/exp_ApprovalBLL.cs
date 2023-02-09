using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_ApprovalBLL //: IDisposible
    {
        public exp_ApprovalBLL()
        {
            //exp_ApprovalDAO = exp_Approval.GetInstanceThreadSafe;
            exp_ApprovalDAO = new exp_ApprovalDAO();
        }

        public exp_ApprovalDAO exp_ApprovalDAO { get; set; }

        public List<exp_Approval> GetAll()
        {
            try
            {
                return exp_ApprovalDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return exp_ApprovalDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return exp_ApprovalDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_Approval _exp_Approval)
        {
            try
            {
                return exp_ApprovalDAO.Add(_exp_Approval);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(exp_Approval _exp_Approval)
        {
            try
            {
                return exp_ApprovalDAO.Update(_exp_Approval);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long approvalId)
        {
            try
            {
                return exp_ApprovalDAO.Delete(approvalId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetCommercialInvoice(string approvalType)
        {
            try
            {
                return exp_ApprovalDAO.GetCommercialInvoice(approvalType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetExpGenerate(string approvalType)
        {
            try
            {
                return exp_ApprovalDAO.GetExpGenerate(approvalType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetProformaInvoice(string approvalType)
        {
            try
            {
                return exp_ApprovalDAO.GetProformaInvoice(approvalType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetSalesOrder(string approvalType, string DepartmentName, int SectionId)
        {
            try
            {
                return exp_ApprovalDAO.GetSalesOrder(approvalType, DepartmentName, SectionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> GetInternalWorkOrder(string approvalType ,string DepartmentName, int SectionId)
        {
            try
            {
                return exp_ApprovalDAO.GetInternalWorkOrder(approvalType, DepartmentName, SectionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Approval> DuplicateCheck(string approvalType, string approvalPassword)
        {
            try
            {
                return exp_ApprovalDAO.DuplicateCheck(approvalType, approvalPassword);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_PaymentProcess> exp_ExpAmendment_GetForEdit(string approvalType, string approvalPassword)
        {
            try
            {
                return exp_ApprovalDAO.exp_ExpAmendment_GetForEdit(approvalType, approvalPassword);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Invoice> exp_PiAmendment_GetForEdit(string approvalType, string approvalPassword)
        {
            try
            {
                return exp_ApprovalDAO.exp_PiAmendment_GetForEdit(approvalType, approvalPassword);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_CommercialInvoice> exp_CiAmendment_GetForEdit(string approvalType, string approvalPassword)
        {
            try
            {
                return exp_ApprovalDAO.exp_CiAmendment_GetForEdit(approvalType, approvalPassword);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}