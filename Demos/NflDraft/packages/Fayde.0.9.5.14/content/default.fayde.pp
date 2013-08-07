<Page xmlns="http://schemas.wsick.com/fayde"
      xmlns:x="http://schemas.wsick.com/fayde"
      JsType="$rootnamespace$.Default"
      Title="Home Page">
    <Page.Resources>
        <Style x:Key="WelcomeStyle" TargetType="TextBlock">
            <Setter Property="Foreground">
                <Setter.Value>
                    <LinearGradientBrush EndPoint="0.5,1" StartPoint="0.5,0">
                        <GradientStop Color="#FF14BBD2" Offset="0" />
                        <GradientStop Color="#FF013C6C" Offset="1" />
                    </LinearGradientBrush>
                </Setter.Value>
            </Setter>
            <Setter Property="FontFamily" Value="Segoe UI Light, Lucida Sans Unicode, Verdana" />
            <Setter Property="FontSize" Value="50" />
            <Setter Property="HorizontalAlignment" Value="Center" />
            <Setter Property="VerticalAlignment" Value="Center" />
        </Style>
    </Page.Resources>
    <Grid x:Name="LayoutRoot" Background="White">
        <TextBlock Text="Welcome to Fayde!" Style="{StaticResource WelcomeStyle}" />
    </Grid>
</Page>