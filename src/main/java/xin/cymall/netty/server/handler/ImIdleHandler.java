package xin.cymall.netty.server.handler;

/**
 * @author chenyi
 * @date 2018/3/29 14:42
 */

import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.timeout.IdleStateEvent;
import io.netty.handler.timeout.IdleStateHandler;
import xin.cymall.netty.process.MsgProcessor;

import java.util.concurrent.TimeUnit;

/**
 * @author lishuai
 * @date 2022/7/13
 * 心跳检测
 */

public class ImIdleHandler extends IdleStateHandler implements  ChannelHandler {


    public ImIdleHandler(int readerIdleTimeSeconds, int writerIdleTimeSeconds, int allIdleTimeSeconds) {
        super(readerIdleTimeSeconds, writerIdleTimeSeconds, allIdleTimeSeconds);
    }

    public ImIdleHandler(long readerIdleTime, long writerIdleTime, long allIdleTime, TimeUnit unit) {
        super(readerIdleTime, writerIdleTime, allIdleTime, unit);
    }

    @Override
    public void channelIdle(ChannelHandlerContext ctx, IdleStateEvent e) throws  Exception{
        MsgProcessor process = new MsgProcessor();
        process.logout(ctx.channel());
        ctx.channel().close();
    }
}
