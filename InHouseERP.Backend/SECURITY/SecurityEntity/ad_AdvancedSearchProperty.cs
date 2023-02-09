namespace SecurityEntity
{
    public class ad_AdvancedSearchProperty
    {
        public ad_AdvancedSearchProperty()
        {
        }

        public ad_AdvancedSearchProperty(string propertyName, bool isAdditionalAttribute)
        {
            PropertyName = propertyName;
            IsAdditionalAttribute = isAdditionalAttribute;
        }

        public string PropertyName { get; set; }
        public bool IsAdditionalAttribute { get; set; }
    }
}