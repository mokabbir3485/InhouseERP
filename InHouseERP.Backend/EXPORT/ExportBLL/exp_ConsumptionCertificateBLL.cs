using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_ConsumptionCertificateBLL //: IDisposible
    {
        public exp_ConsumptionCertificateBLL()
        {
            //exp_ConsumptionCertificateDAO = exp_ConsumptionCertificate.GetInstanceThreadSafe;
            exp_ConsumptionCertificateDAO = new exp_ConsumptionCertificateDAO();
        }

        public exp_ConsumptionCertificateDAO exp_ConsumptionCertificateDAO { get; set; }

        public List<exp_ConsumptionCertificate> GetAll()
        {
            try
            {
                return exp_ConsumptionCertificateDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificate> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificate> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(exp_ConsumptionCertificate _exp_ConsumptionCertificate)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.Add(_exp_ConsumptionCertificate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(exp_ConsumptionCertificate _exp_ConsumptionCertificate)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.Update(_exp_ConsumptionCertificate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long consumptionCertificateId)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.Delete(consumptionCertificateId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificate> GetByConsumptionCertificateForReports(long CommercialInvoiceId)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.GetByConsumptionCertificateForReports(CommercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //////////////////////////
        ///exp_ConsumptionCertificateDescriptionBLL
        public List<exp_ConsumptionCertificateDescription> GetAllDescription(
            long? consumptionCertificateDescriptionId = null, long? consumptionCertificateId = null)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.GetAllDescription(consumptionCertificateDescriptionId,
                    consumptionCertificateId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateDescription> GetDynamicDescription(string whereCondition,
            string orderByExpression)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.GetDynamicDescription(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateDescription> GetPagedDescription(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.GetPagedDescription(startRecordNo, rowPerPage, whereClause,
                    sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long PostDescription(exp_ConsumptionCertificateDescription _exp_ConsumptionCertificateDescription)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.PostDescription(_exp_ConsumptionCertificateDescription);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(exp_ConsumptionCertificateDescription _exp_ConsumptionCertificateDescription)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.UpdateDescription(_exp_ConsumptionCertificateDescription);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteDescription(long consumptionCertificateDescriptionId)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.DeleteDescription(consumptionCertificateDescriptionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateDescription> Get_DescriptionOfGoods(int ciId)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.Get_DescriptionOfGoods(ciId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //////////////////////////
        ///exp_ConsumptionCertificateRawMaterialsDAOBLL
        public List<exp_ConsumptionCertificateRawMaterials> GetAllRawMaterials()
        {
            try
            {
                return exp_ConsumptionCertificateDAO.GetAllRawMaterials();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateRawMaterials> GetDynamicRawMaterials(string whereCondition,
            string orderByExpression)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.GetDynamicRawMaterials(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateRawMaterials> GetPagedRawMaterials(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.GetPagedRawMaterials(startRecordNo, rowPerPage, whereClause,
                    sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddRawMaterials(exp_ConsumptionCertificateRawMaterials _exp_ConsumptionCertificateRawMaterials)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.AddRawMaterials(_exp_ConsumptionCertificateRawMaterials);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_ConsumptionCertificateRawMaterials> GetByConsumptionCertificateRawMetrialByCiId(
            long CommercialInvoiceId)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.GetByConsumptionCertificateRawMetrialByCiId(CommercialInvoiceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateRawMaterials(exp_ConsumptionCertificateRawMaterials _exp_ConsumptionCertificateRawMaterials)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.UpdateRawMaterials(_exp_ConsumptionCertificateRawMaterials);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteRawMaterials(long consumptionCertificateRawMaterialsId)
        {
            try
            {
                return exp_ConsumptionCertificateDAO.DeleteRawMaterials(consumptionCertificateRawMaterialsId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}