export default function Badge({className, children, variant='success', ...other}) {
    // const cls = `badge bg-${variant} p-2 rounded`
    const cls = `badge bg-${variant} p-2 rounded`
    return (
      <button className={cls} {...other}>{children}</button>
    );
}