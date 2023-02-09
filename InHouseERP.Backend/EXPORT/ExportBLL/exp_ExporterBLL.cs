using System;
using System.Collections.Generic;
using ExportDAL;
using ExportEntity;

namespace ExportBLL
{
    public class exp_ExporterBLL //: IDisposible
    {
        public exp_ExporterBLL()
        {
            //exp_ExporterDAO = exp_Exporter.GetInstanceThreadSafe;
            exp_ExporterDAO = new exp_ExporterDAO();
        }

        public exp_ExporterDAO exp_ExporterDAO { get; set; }

        public List<exp_Exporter> GetAll()
        {
            try
            {
                return exp_ExporterDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Exporter> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return exp_ExporterDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<exp_Exporter> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return exp_ExporterDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(exp_Exporter _exp_Exporter)
        {
            try
            {
                return exp_ExporterDAO.Add(_exp_Exporter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(exp_Exporter _exp_Exporter)
        {
            try
            {
                return exp_ExporterDAO.Update(_exp_Exporter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int exporterId)
        {
            try
            {
                return exp_ExporterDAO.Delete(exporterId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}